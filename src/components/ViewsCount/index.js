function ViewsCount(props) {
  let { views } = props;
  let viewsFormatted = "";
  if (views !== undefined) {
    const viewsCount = parseInt(views);

    if (viewsCount < 1000) {
      viewsFormatted = `${viewsCount}`;
    }
    if (viewsCount >= 1000 && views <= 9999) {
      viewsFormatted = `${(viewsCount / 1000).toFixed(2)} k`;
    }
    if (viewsCount >= 10000 && viewsCount < 100000) {
      viewsFormatted = `${(viewsCount / 10000).toFixed(1)} k`;
    }

    if (viewsCount >= 100000 && viewsCount < 1000000) {
      viewsFormatted = `${(viewsCount / 100000).toFixed(1)} Lakh`;
    }
    if (viewsCount >= 1000000 && viewsCount < 1000000000) {
      let million = Math.round(viewsCount, 1);
      viewsFormatted = `${(million / 1000000).toFixed(0)} Million`;
    }

    if (viewsCount >= 1000000000 && viewsCount < 1000000000000) {
      viewsFormatted = `${(viewsCount / 1000000000).toFixed(0)} Billion`;
    }

    if (viewsCount >= 1000000000000) {
      viewsFormatted = `${(viewsCount / 1000000000000).toFixed(0)} Trilion`;
    }
  }

  return <p>{viewsFormatted} Views</p>;
}

export default ViewsCount;
