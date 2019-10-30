
/**
 *
 *
 * @param {*} dataArr  数据数组
 * @param {*} keysNeed 所需的必要属性
 */
function filterArray (dataArr,keysNeed) {
    return dataArr.map(element => {
        let obj = {};
        for (let i = 0 ;i < keysNeed.length; i++) {
            let key = keysNeed[i];
            obj[key] = element[key];
        }
        return obj;
    });
}

module.exports = {filterArray};