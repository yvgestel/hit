function authExceptionHelper (exception) {
    let message
    switch (exception) {

        case 'auth/invalid-email':
            message = 'Incorrect combination of email and password.'
            break
        case 'auth/user-not-found':
            message = 'This user does not exist. Please create an account.'
            break
        case 'auth/wrong-password':
            message = 'Incorrect combination of email and password.'
            break
        case 'auth/internal-error':
            message = 'Something went wrong. Please try again later.'
            break
        case 'auth/too-many-requests':
            message = 'We are having some issues. Please try again later.'
            break
        case 'auth/email-already-in-use':
            message = 'This email is already used.'
            break
        default: message = exception
    }

   return message
}

export default authExceptionHelper  