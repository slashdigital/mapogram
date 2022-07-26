const videoClipsStartEndTime = [
    [1, 4], [10, 11], [4, 5]
];

function mergeOverlaps(clipTime) {
    //iterate the input
    for (let i=0; i<clipTime.length; i++){
        //find any overlaps
        for (let j=0; j<clipTime.length; j++){
            //check for overlaps
            //1. first clip is subset of 2nd clip
            

            //2. 2nd clip starts before 1st clip and overlaps
            if (clipTime[i][0]>clipTime[j][0]) {
                //s1>s2, s1>=e1
                if (clipTime[i][0]<=clipTime[j][1])){
                }
                
                //s1>s2, s1>=e1

            }

            //3. 2nd clip starts after 1st clip and overlaps

            //merge clip

        }
    }
};
