import utils from 'utility';

export function getHeadUrl(email) {
  const md5 = utils.md5(email);
  return `https://www.gravatar.com/avatar/${md5}`;
}
