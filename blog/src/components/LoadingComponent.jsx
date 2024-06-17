import {Loading} from "tdesign-react";

function LoadingComponent(props) {
    let {size} = props
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
        }}>
            <Loading
                delay={0}
                fullscreen={false}
                indicator
                inheritColor={false}
                loading
                preventScrollThrough
                showOverlay
                size={size ? size : "small"}
            />
        </div>
    )
}

export default LoadingComponent
