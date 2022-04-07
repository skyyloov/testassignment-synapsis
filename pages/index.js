import Link from "next/link";
import fetch from 'isomorphic-unfetch';

import { Button, Card } from 'semantic-ui-react';

const Index = ({ user }) => {
  return (
    <div className="notes-container">
      <h1>Users</h1>
      <div className="grid wrapper">
        {user.map(user => {
          return (
            <div key={user._id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${user._id}`}>
                      <a>{user.firstName}</a>
                    </Link>
                  </Card.Header>
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
          )
        })}
      </div>
    </div>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/user');
  const { data } = await res.json();

  return { user: data }
}

export default Index;