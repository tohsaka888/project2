const newComment = async (id,cookie) => {

    const res1 = await fetch(`http://localhost:3000/comment/playlist?id=${id}&cookie=${cookie}`);
    const data = await res1.json();
}
