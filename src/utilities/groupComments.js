import { getHours, getMins } from './dateParser';

export default function groupComments (comments) {
  const ans = [];

  if (!comments) {
    return [];
  }

  for (const comment of comments) {
    if (ans.length === 0) {
      const newComment = {
        ...comment,
        contents: [
          comment.content
        ]
      };

      ans.push(newComment);
      continue;
    }

    const prevDate = ans[ans.length - 1].createdAt;
    const currentDate = comment.createdAt;

    const prevHs = getHours(prevDate);
    const currentHs = getHours(currentDate);

    const prevMins = getMins(prevDate);
    const currentMins = getMins(currentDate);

    const existIndex = ans.findIndex(e => getMins(e.createdAt) === currentMins);

    if (existIndex === -1) {
      const newComment = {
        ...comment,
        contents: [
          comment.content
        ]
      };

      ans.push(newComment);
      continue;
    }

    if ((prevHs === currentHs) && (prevMins === currentMins)) {
      ans[existIndex].contents.push(comment.content);
    }
  }

  return ans;
};
