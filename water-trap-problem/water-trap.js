function calculateWater(heights){
    if(heights.length === 0){
        return;
    }
    let left = 0;
    let right = heights.length - 1;
    let water_stored = 0;
    let left_max = 0 ;
    let right_max = 0;
    while (left < right){
        if( heights[left] <= heights[right]){
            left_max = Math.max(left_max, heights[left]);
            water_stored += left_max - heights[left];
            left++;
        }else{
            right_max = Math.max(right_max, heights[right]);
            water_stored += right_max - heights[right];
            right--;
        }
    }
    return water_stored;
}

// Run ----

const testCases = [[0,4,0,0,0,6,0,6,4,0]];
testCases.forEach(heights => {
    const water_stored = calculateWater(heights);
    console.log(`Heights: ${heights}`);
    console.log(`Water stored: ${water_stored}`);
});

module.exports = { calculateWater };
