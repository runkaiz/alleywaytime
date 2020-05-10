import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

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
            wus
            rank
            total_teams
            last
            credit
            donors {
              name
              credit
              rank
              id
              wus
            }
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
          The following data came from the Folding@Home api, refreshes every 5
          minutes.
        </Alert>
        <CardColumns>
          <Card bg="info">
            <Card.Header>Team</Card.Header>
            <Card.Body>
              <Card.Title>Rank</Card.Title>
              <Card.Text>
                We are currently rank {data.teamData.raw_data.rank} out of a
                total of {data.teamData.raw_data.total_teams} teams.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card bg="info">
            <Card.Header>Team</Card.Header>
            <Card.Body>
              <Card.Title>Work Units</Card.Title>
              <Card.Text>
                We completed a total of {data.teamData.raw_data.wus} work units.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card bg="info">
            <Card.Header>Team</Card.Header>
            <Card.Body>
              <Card.Title>Last Active Machine</Card.Title>
              <Card.Text>
                {data.teamData.raw_data.last} is the last time a machine was
                active.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card bg="info">
            <Card.Header>Team</Card.Header>
            <Card.Body>
              <Card.Title>Total Credit Earned</Card.Title>
              <Card.Text>
                We earned a total of {data.teamData.raw_data.credit} credit.
              </Card.Text>
            </Card.Body>
          </Card>
          {data.teamData.raw_data.donors.map((donor) => {
            const wusPercent =
              Math.round(donor.wus / data.teamData.raw_data.wus) * 100;
            return (
              <Card bg="primary">
                <Card.Header>Team Member</Card.Header>
                <Card.Body>
                  <Card.Title>{donor.name}</Card.Title>
                  <Card.Text>
                    <div key={donor.id}>
                      Global Rank: {donor.rank}
                      <br />
                      Credit: {donor.credit}
                      <br />
                      WUs: {donor.wus}
                      <br />
                      {wusPercent}% of the total work units.
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
        <Link to="/contact" className="button -primary">
          Get in touch &rarr;
        </Link>
      </div>
    )}
  />
);
