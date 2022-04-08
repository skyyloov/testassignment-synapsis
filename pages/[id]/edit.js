import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, FormInput, Loader, Container } from 'semantic-ui-react';
import { useRouter } from 'next/router';


const EditUser = ({ user }) => {
    console.log(user);
    const [form, setForm] = useState({ firstName: user[0].firstName, lastName: user[0].lastName, email: user[0].email, phone: user[0].phone, address: user[0].address });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    };
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };
    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateUser();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])
    const updateUser = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/user/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    const validate = () => {
        let err = {};

        if (!form.firstName) {
            err.firstName = 'firstName is required';
        }

        if (!form.lastName) {
            err.lastName = 'lastName is required';
        }

        if (!form.email) {
            err.email = 'email is required';
        }

        if (!form.phone) {
            err.phone = 'phone is required';
        }

        if (!form.address) {
            err.address = 'address is required';
        }
        return err;
    }

    return (
        <Container style={{ marginTop: '5em' }}>
            <h1>Update User</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <FormInput
                                fluid
                                error={errors.firstName ? { content: 'Please enter a firstName', pointing: 'below' } : null}
                                label="firstName"
                                placeholder="firstname"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                            />
                            <FormInput
                                fluid
                                error={errors.lastName ? { content: 'Please enter a lastName', pointing: 'below' } : null}
                                label="lastName"
                                placeholder="lastname"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                            />
                            <FormInput
                                fluid
                                error={errors.email ? { content: 'Please enter a email', pointing: 'below' } : null}
                                label="email"
                                placeholder="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                            <FormInput
                                fluid
                                error={errors.phone ? { content: 'Please enter a phone', pointing: 'below' } : null}
                                label="phone"
                                placeholder="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                            />
                            <FormInput
                                fluid
                                error={errors.address ? { content: 'Please enter a address', pointing: 'below' } : null}
                                label="address"
                                placeholder="address"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                            />

                            <Button type='submit'>Update</Button>
                        </Form>
                }
            </div>
        </Container >
    )

}

EditUser.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/user/${id}`);

    const { data } = await res.json();

    return { user: data }
}

export default EditUser;