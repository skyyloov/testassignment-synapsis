import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader, Container, Grid, Card, Segment } from 'semantic-ui-react';

const User = ({ user }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteUser();
        }
    }, [isDeleting])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const deleteUser = async () => {
        const userId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/user/${userId}`, {
                method: 'DELETE'
            })

            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }
    return (
        <Container style={{ marginTop: '5em' }}>
            {isDeleting ?
                <Loader active /> :
                <>
                    <Grid>
                        <Card>
                            <Card.Content>
                                <Segment.Group>
                                    <Segment as='h3'>FirstName : {[user[0].firstName]}</Segment>
                                    <Segment as='h3'>LastName : {user[0].lastName}</Segment>
                                    <Segment as='h3'>Email : {user[0].email}</Segment>
                                    <Segment as='h3'>Phone : {user[0].phone}</Segment>
                                    <Segment as='h3'>Address : {user[0].address}</Segment>
                                </Segment.Group>
                            </Card.Content>
                            <Card.Content extra>
                                <Button color='red' style={{ marginBottom: '1em' }} onClick={open}>Delete</Button>
                            </Card.Content>
                        </Card>
                    </Grid>
                </>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </Container>
    )
}

User.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/user/${id}`);

    const { data } = await res.json();

    return { user: data }

}

export default User;