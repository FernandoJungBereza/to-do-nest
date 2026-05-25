import type { Response } from 'express';

const ACCESS_MAX_AGE_MS = 60 * 60 * 1000;
const REFRESH_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export function setAccessTokenCookie(res: Response, accessToken: string, secure: boolean): void {
	res.cookie('accessToken', accessToken, {
		httpOnly: true,
		secure,
		sameSite: 'lax',
		maxAge: ACCESS_MAX_AGE_MS,
	});
}

export function setRefreshTokenCookie(res: Response, refreshToken: string, secure: boolean): void {
	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		secure,
		sameSite: 'lax',
		maxAge: REFRESH_MAX_AGE_MS,
	});
}

export function setAuthCookies(
	res: Response,
	accessToken: string,
	refreshToken: string,
	options: { secure: boolean },
): void {
	setAccessTokenCookie(res, accessToken, options.secure);
	setRefreshTokenCookie(res, refreshToken, options.secure);
}

const cookieOptions = (secure: boolean) => ({
	httpOnly: true,
	secure,
	sameSite: 'lax' as const,
});

export function clearAuthCookies(res: Response, options: { secure: boolean }): void {
	const opts = cookieOptions(options.secure);
	res.clearCookie('accessToken', opts);
	res.clearCookie('refreshToken', opts);
}
