// immer를 인터넷 익스플로러에서 사용하기 위한 product 확장
import product, { enableES5 } from 'immer';

export default (...args) => {
    enableES5();
    return product(...args);
};
