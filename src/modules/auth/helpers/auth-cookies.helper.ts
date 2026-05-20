import type { Response } from 'express';

const ACCESS_MAX_AGE_MS = 60 * 60 * 1000;
const REFRESH_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

const baseOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'lax' as const,
};

export function setAccessTokenCookie(res: Response, accessToken: string): void {
	res.cookie('accessToken', accessToken, {
		...baseOptions,
		maxAge: ACCESS_MAX_AGE_MS,
	});
}

export function setRefreshTokenCookie(res: Response, refreshToken: string): void {
	res.cookie('refreshToken', refreshToken, {
		...baseOptions,
		maxAge: REFRESH_MAX_AGE_MS,
	});
}

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string): void {
	setAccessTokenCookie(res, accessToken);
	setRefreshTokenCookie(res, refreshToken);
}
