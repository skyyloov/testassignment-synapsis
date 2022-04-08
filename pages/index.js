import Link from "next/link";
import fetch from 'isomorphic-unfetch';
import { Button, Card, Container, Grid, Header, Segment } from 'semantic-ui-react';

const Index = ({ user }) => {
  return (
    <Container style={{ marginTop: '5em' }}>

      <Grid.Row>
        <Grid.Column>
          <Header as='h1' dividing>
            User List
          </Header>
        </Grid.Column>
      </Grid.Row>

      <Grid columns='equal' style={{ marginTop: '2em' }}>
        <Grid.Row columns={4}>
          {user.map(user => {
            return (
              <Grid.Column style={{ marginBottom: '1em' }}>
                <div key={user._id}>
                  <Card>

                    <Card.Content>
                      <Segment.Group>
                        <Segment as='h3'>FirstName : {user.firstName}</Segment>
                        <Segment as='h3'>LastName : {user.lastName}</Segment>
                      </Segment.Group>
                    </Card.Content>
                    <Card.Content extra>
                      <Link href={`/${user._id}`}>
                        <Button primary>View</Button>
                      </Link>
                      <Link href={`/${user._id}/edit`}>
                        <Button primary>Edit</Button>
                      </Link>
                    </Card.Content>
                  </Card>
                </div>
              </Grid.Column>
            )
          })}
        </Grid.Row>
      </Grid>

    </Container >
  )
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/user');
  const { data } = await res.json();

  return { user: data }
}

export default Index;