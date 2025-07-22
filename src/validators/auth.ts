import {ILoginRequest} from '@/interfaces/login'


export const emailValidator = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
        return 'Email is required'
    }

    if (!emailRegex.test(email)) {
        return 'Invalid email address'
    }

    return ''
}

export const passwordValidator = (password: string): string | true => {
    if (!password) {
        return 'Password is required'
    }

    if (password.length < 8) {
        return 'Password must be at least 8 characters long'
    }

    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter'
    }

    if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter'
    }

    if (!/[0-9]/.test(password)) {
        return 'Password must contain at least one number'
    }

    if (!/[!@#$%^&*(),.?':{}|<>]/.test(password)) {
        return 'Password must contain at least one special character'
    }

    return ''
}



export const loginProcessValidator = (request: ILoginRequest) : string[] => {
    let errors: string[] = [];

    let emailError = emailValidator(request.email)
    if (emailError != '') {
        errors.push(emailError);
    }

    let passwordError = passwordValidator(request.password)
    if (passwordError != '') {
        errors.push(passwordError);
    }

    return errors;
}