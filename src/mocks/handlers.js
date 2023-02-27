import { rest } from 'msw'
export const handlers = [
    // Handles a POST /login request
    rest.get('user', (req, res, ctx) => {
        // Check if the user is authenticated in this session
        const isAuthenticated = sessionStorage.getItem('is-authenticated')
        if (!isAuthenticated) {
            // If not authenticated, respond with a 403 error
            return res(
                ctx.delay(1000),
                ctx.status(403),
                ctx.json({
                    errorMessage: 'Mock: Mock Fähler',
                }),
            )
        }
        // If authenticated, return a mocked user details
        return res(
            ctx.status(200),
            ctx.json({
                username: 'Mocki Freifrau von Mock',
            }),
        )
    }),
    rest.post('login', async (req, res, ctx) => {
        const { userName } = await req.json();
        if(userName !== 'mocki') {
            return res(
                ctx.status(500),
                ctx.json({
                    errorMessage: 'Mock 500: Alles ganz falsch',
                }),
            )
        }
        // If authenticated, return a mocked user details
        return res(
            ctx.delay(1000),
            ctx.status(200),
            ctx.json({
                message: 'ok',
                username: 'Mocki Freifrau von Mock',
            }),
        )
    }),
]

