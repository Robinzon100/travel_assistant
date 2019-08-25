const queries = require("./../queries/usersAndHost");

exports.isVisited = (postId, visitorIp) => {
    queries.getPostsVisitorsIp("posts", postId).then(visitedIps => {
        let isVisited = false;

        console.log(visitedIps)

        visitedIps.forEach(el => {
            if (el == visitorIp) {
                isVisited = true;
            }
        });

        if (isVisited) {
            return;
        } else {
            queries
                .findById("posts", postId)
                .then(post => {
                    queries.addVisitors(post._id, "posts", visitorIp);
                })
                .catch(err => console.log(err));
        }
    });
};
