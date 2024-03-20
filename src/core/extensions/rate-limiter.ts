import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

type TApplyRateLimiterInput = {
	request: FastifyRequest;
	reply: FastifyReply;
	options: rateLimiter.RateLimitOptions;
	key: string;
};

const applyRateLimit = async ({ request, reply, options, key }: TApplyRateLimiterInput) => {
	const { limit, interval, redisClient } = options;

	const currentCount = await redisClient.incr(key);
	redisClient.expire(key, interval);

	if (currentCount > limit) {
		reply.code(429).send({ error: 'Rate limit exceeded. Too many requests.' });
		return false;
	}

	reply.locals.headers = {
		'X-RateLimit-Limit': limit,
		'X-RateLimit-Remaining': limit - currentCount,
		'X-RateLimit-Reset': interval,
	};
	return true;
};

const _rateLimitPlugin: FastifyPluginCallback<rateLimiter.RateLimitOptions> = (fastify, options, done) => {
	const rateLimitMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
		const isRouteLimited = request.routeOptions.config.rateLimit;
		const key = isRouteLimited
			? `rate-limit:${request.ip}:${request.method}-${request.url}`
			: `rate-limit:${request.method}:global`;

		const rateLimitOptions = isRouteLimited ? { ...options, ...request.routeOptions.config.rateLimit } : options;

		const allowed = await applyRateLimit({ request, reply, options: rateLimitOptions, key });

		if (!allowed) return;
	};
	fastify.addHook('preHandler', rateLimitMiddleware);
	done();
};

export const rateLimitPlugin = fp(_rateLimitPlugin);
