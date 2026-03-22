/**
 * Quick SMTP check using the same env vars as api/send-email.ts.
 * Loads web/.env then root .env (later overrides if both set).
 *
 * Usage (from repo root): node scripts/test-email.cjs
 */
const path = require('node:path')
const fs = require('node:fs')

const root = path.join(__dirname, '..')
const webEnv = path.join(root, 'web', '.env')
const rootEnv = path.join(root, '.env')

function loadEnvFile(filePath) {
	if (!fs.existsSync(filePath)) return
	const text = fs.readFileSync(filePath, 'utf8')
	for (const line of text.split('\n')) {
		const trimmed = line.trim()
		if (!trimmed || trimmed.startsWith('#')) continue
		const eq = trimmed.indexOf('=')
		if (eq === -1) continue
		const key = trimmed.slice(0, eq).trim()
		let val = trimmed.slice(eq + 1).trim()
		if (
			(val.startsWith('"') && val.endsWith('"')) ||
			(val.startsWith("'") && val.endsWith("'"))
		) {
			val = val.slice(1, -1)
		}
		if (process.env[key] === undefined) process.env[key] = val
	}
}

loadEnvFile(webEnv)
loadEnvFile(rootEnv)

const nodemailer = require('nodemailer')

async function main() {
	const user = process.env.GMAIL_USER?.trim()
	const rawPass = process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASS
	const pass = rawPass?.replace(/\s/g, '')?.trim() || ''
	const to = process.env.EMAIL_TO?.trim() || user

	if (!user || !pass) {
		console.error(
			'Missing GMAIL_USER or GMAIL_APP_PASSWORD.\n',
			'Add them to web/.env or repo root .env (same names as Vercel).',
		)
		process.exit(1)
	}

	const mailOptions = {
		from: `"RCCG Psalms & Hymns (test)" <${user}>`,
		to: to || user,
		subject: '[RCCG Psalms & Hymns] SMTP test from scripts/test-email.cjs',
		text: 'If you received this, Gmail app password + SMTP are working.',
	}

	const trySend = async (port, secure) => {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port,
			secure,
			auth: { user, pass },
		})
		await transporter.verify()
		await transporter.sendMail(mailOptions)
	}

	try {
		try {
			await trySend(587, false)
		} catch (e587) {
			console.warn('Port 587 failed, trying 465:', e587?.message || e587)
			await trySend(465, true)
		}
		console.log('OK — test email sent to:', to || user)
	} catch (err) {
		console.error('FAILED:', err?.message || err)
		process.exit(1)
	}
}

main()
