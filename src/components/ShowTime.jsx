import {parseISO,formatDistanceToNow} from 'date-fns-jalali'

export const ShowTime = ({timestamp}) => {
    let timeAgo =''
    if(timestamp){
        const date = parseISO(timestamp);
        const time = formatDistanceToNow(date)
        timeAgo=`${time} قبل`
    }

    return(
        <span>
            <i>{timeAgo}</i> &nbsp;
        </span>
    )
}

