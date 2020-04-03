import React from "react";
import moment from 'moment';
import { Comment, Tooltip, Avatar } from 'antd';

const renderContent = (message, type) => {
    if (type === 'Video') {
        return (
            <video
                style={{ maxWidth: '200px' }}
                src={message}
                alt="video"
                type="video/mp4" controls
            />
        )
    } else if (type === 'Image') {
        return (
            <img
                style={{ maxWidth: '200px' }}
                src={message}
                alt="img"
            />
        );
    } else if (type === 'Text') {
        return (
            <p>
                {message}
            </p>
        );
    }
}

function ChatCard(props) {
    return (
        <div style={{ width: '100%' }}>
            <Comment
                author={props.sender.name}
                avatar={
                    <Avatar
                        src={props.sender.image} alt={props.sender.name}
                    />
                }
                content={
                    renderContent(props.message, props.type)  
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                    </Tooltip>
                }
            />
        </div>
    )
}

export default ChatCard;