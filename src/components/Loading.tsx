/* eslint-disable prettier/prettier */
import Load from './Loading.module.css';

function Loading() {
    return (
        <div className={Load.main}>
            <span className={Load.loader} />
        </div>
    );
}

export default Loading;
