import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

export default () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            home {
              title
              description
            }
          }
        }
        teamData {
          raw_data {
            founder
            id
            rank
            name
            score
            wus
          }
        }
      }
    `}
    render={(data) => (
      <div className="hero-header">
        <div className="headline">{data.site.siteMetadata.home.title}</div>
        <div
          className="primary-content"
          dangerouslySetInnerHTML={{
            __html: data.site.siteMetadata.home.description,
          }}
        />
        <Alert variant="primary">
          <Alert.Heading>Hey, nice to see you!</Alert.Heading>
          <p>
            This project (including the website you see right now) is entirely
            maintained by me. You can call me Nico by the way. I have my own
            tiny server that hosts most of the projects, and this is not an
            exception. If you ever come across this server and realized that it
            is down, please understand that 99% uptime is not a joke when you
            look at enterprise hosting solutions.
          </p>
          <hr />
          <p className="mb-0">
            Anyways, please join my team if you can. We won't get any awards...
            but we can help this world to be a better place.
          </p>
        </Alert>
        <Alert variant="info">
          The following data came from the Folding@Home api, refreshes every
          day.
        </Alert>
        <CardDeck>
          <Card bg="info">
            <Card.Header>Team</Card.Header>
            <Card.Body>
              <Card.Title>Rank</Card.Title>
              <Card.Text>
                We are currently rank {data.teamData.raw_data.rank}.
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <Card bg="info">
            <Card.Header>Team</Card.Header>
            <Card.Body>
              <Card.Title>Work Units</Card.Title>
              <Card.Text>
                We completed a total of {data.teamData.raw_data.wus} work units. The score is {data.teamData.raw_data.score}.
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <Card bg="info">
            <Card.Header>Team</Card.Header>
            <Card.Body>
              <Card.Title>Information</Card.Title>
              <Card.Text>
                The team is called {data.teamData.raw_data.name}. Our founder is {data.teamData.raw_data.founder}, and our team number is {data.teamData.raw_data.id}.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
    )}
  />
);
