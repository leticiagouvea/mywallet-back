import joi from "joi";

const signUpSchema = joi.object({
    name: joi.string().required().min(2).max(20),
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
    confirmPassword: joi.ref("password")
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(6)
});

const valueSchema = joi.object({
    value: joi.number().required(),
    text: joi.string().required(),
    type: joi.valid("input", "output").required()
});

const updateValueSchema = joi.object({
    value: joi.number().required(),
    text: joi.string().required(),
})

async function validateSignUp(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;

    const validation = signUpSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const error = validation.error.details.map(detail => detail.message);
        return res.status(422).send(error);
    }

    if (password !== confirmPassword) {
        return res.status(422).send("Passwords don't match!");
    }

    res.locals.user = { name, email, password };

    next();
}

async function validateLogin(req, res, next) {
    const { email, password } = req.body;

    const validation = loginSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const error = validation.error.details.map(detail => detail.message);
        return res.status(422).send(error);
    }

    res.locals.user = { email, password };

    next();
}

async function validateValue(req, res, next) {
    const { value, text, type } = req.body;

    const validation = valueSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const error = validation.error.details.map(detail => detail.message);
        return res.status(422).send(error);
    }

    res.locals.value = { value, text, type };

    next();
}

async function validateUpdateValue(req, res, next) {
    const { value, text } = req.body;

    const validation = updateValueSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const error = validation.error.details.map(detail => detail.message);
        return res.status(422).send(error);
    }

    res.locals.value = { value, text };

    next();
}

export { validateLogin, validateSignUp, validateValue, validateUpdateValue };