const PublishedTimeAgo = ({ date }) => {
  let currentTimeInmilliseconds = new Date();
  let publishedTimeInMilliSeconds = new Date(date);

  const currentTimeInSeconds = currentTimeInmilliseconds.getTime() / 1000;

  const publishedTimeInSeconds = publishedTimeInMilliSeconds.getTime() / 1000;

  const differenceInSeconds = parseInt(
    currentTimeInSeconds - publishedTimeInSeconds
  );

  const timeInSeconds = {};

  timeInSeconds.second = 1;
  timeInSeconds.minute = timeInSeconds.second * 60;
  timeInSeconds.hour = timeInSeconds.minute * 60;
  timeInSeconds.day = timeInSeconds.hour * 24;
  timeInSeconds.month = timeInSeconds.day * 30;
  timeInSeconds.year = timeInSeconds.month * 12;

  let timeAgo = "";

  if (
    timeInSeconds.second <= differenceInSeconds &&
    differenceInSeconds <= timeInSeconds.minute
  ) {

    let  second  = parseInt(
        differenceInSeconds / timeInSeconds.minute
      )
    timeAgo = `${second <= 10 ?" few seconds":second+" seconds"} ago`;
  }
  if (
    timeInSeconds.minute <= differenceInSeconds &&
    differenceInSeconds <= timeInSeconds.hour
  ) {
    let minute = 
    differenceInSeconds / timeInSeconds.minute
    timeAgo = `${parseInt(minute === 1 ? minute+"minute":minute+"minutes")} ago`;
  }
  if (
    timeInSeconds.hour <= differenceInSeconds &&
    differenceInSeconds <= timeInSeconds.day
  ) {
    const hour =  parseInt(differenceInSeconds / timeInSeconds.hour)
    timeAgo = `${hour === 1?hour + " hour":hour+" hours"} ago`;
  }
  if (
    timeInSeconds.day <= differenceInSeconds &&
    differenceInSeconds <= timeInSeconds.month
  ) {
    let day = parseInt(differenceInSeconds / timeInSeconds.day)
    let isAWeek = day % 7 === 0
    if(isAWeek){
      let week = parseInt(differenceInSeconds / timeInSeconds.day) / 7
      timeAgo = `${(week)=== 1 ? week+" week":week+" weeks"} ago `
    }
    else{

    timeAgo = `${ day === 1 ? day + " Day":day+" Days"} ago`;
    }
  }
  if (
    timeInSeconds.month <= differenceInSeconds &&
    differenceInSeconds <= timeInSeconds.year
  ) {
    const month =   parseInt(differenceInSeconds / timeInSeconds.month)
   timeAgo = `${month  === 1?month+" month":month+" months"} ago`;
  }
  if (differenceInSeconds > timeInSeconds.year) {
    const year = parseInt(
        differenceInSeconds / timeInSeconds.year
      )
    timeAgo = `${year === 1 ? year+" year":year+" years"} ago `;
  }
  
  return timeAgo;
};

export default PublishedTimeAgo;
