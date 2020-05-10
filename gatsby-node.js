const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`);

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {}, // additional data can be passed via context
    });
  });
};

const axios = require("axios");
const crypto = require("crypto");

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  // fetch raw data from the randomuser api
  const fetchTeamData = () =>
    axios.get(`https://stats.foldingathome.org/api/team/252349`);
  // await for results
  const res = await fetchTeamData();

  // Create your node object
  const teamNode = {
    id: `252349`,
    parent: `__SOURCE__`,
    internal: {
      type: `TeamData`,
    },
    children: [],
    raw_data: res.data,
  };

  // Get content digest of node. (Required field)
  const contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(teamNode))
    .digest(`hex`);

  teamNode.internal.contentDigest = contentDigest;

  // Create node with the gatsby createNode() API
  createNode(teamNode);

  return;
};
