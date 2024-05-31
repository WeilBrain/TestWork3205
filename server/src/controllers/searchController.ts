import {Request, Response} from 'express'
// @ts-ignore
import users from '../data/users.json'

export const searchUsers = (req: Request, res: Response) => {
    const {email, number} = req.body

    // Проводим валидацию email и number
    if (!email || !email.includes('@')) {
        return res.status(400).send('invalid email')
    }
    if(number && !/^\d{6}$/.test(number)) {
        return res.status(400).send('invalid number')
    }

    // Ищем users
    const result = users.filter((user: { email: string; number: number }) =>
        user.email === email && (!number || user.number === number)
    );

    // Эмитация задержки
    setTimeout(() => {
        res.json(result)
    }, 5000) // 5 сек.
}