// eslint-disable-next-line
const {
  SSH_USERNAME,
  SSH_HOST,
  REF,
  REPO,
  DEST_PATH,
} = process.env;

module.exports = {
  deploy: {
    production: {
      user: SSH_USERNAME,
      host: SSH_HOST,
      ref: REF,
      repo: REPO,
      path: DEST_PATH,
      'post-deploy': 'docker compose up --build -d'
    },
  },
};
