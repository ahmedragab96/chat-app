import React, { Component } from 'react'
import { Form, Icon, Input, Button, Row, Col, } from 'antd';
import io from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";
import { getChats, afterPostMessage } from "../../../_actions/chat_actions"
import ChatCard from "./Sections/ChatCard"
import Dropzone from 'react-dropzone';
import {
  uploadImage,
} from '../../../helperFunctions/uploadFile';

export class ChatPage extends Component {
    state = {
        chatMessage: "",
    }

    componentDidMount() {
        let server = "https://ichattingeasy.herokuapp.com";

        this.props.dispatch(getChats());

        this.socket = io(server);

        console.log('hereeee', this.props.user);

        this.socket.on("Output Chat Message", messageFromBackEnd => {
            console.log(messageFromBackEnd)
            this.props.dispatch(afterPostMessage(messageFromBackEnd));
        })
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    hanleSearchChange = (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }

    renderCards = () =>
        this.props.chats.chats
        && this.props.chats.chats.map((chat) => (
            <ChatCard key={chat._id}  {...chat} />
        ));

    onDrop = async (files) => {
        console.log(files)
        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append("file", files[0])

        const fileData = await uploadImage(files[0], files[0].name.split('.')[0]);
        if (fileData.key) {
            let chatMessage = `${process.env.REACT_APP_S3_URL}${fileData.key}`;
            let userId = this.props.user.userData._id
            let userName = this.props.user.userData.name;
            let userImage = this.props.user.userData.image;
            let nowTime = moment();
            let type = files[0].type.indexOf('video') >= 0 ? "Video" : "Image";

            this.socket.emit("Input Chat Message", {
                chatMessage,
                userId,
                userName,
                userImage,
                nowTime,
                type
            });
        }
    }


    submitChatMessage = (e) => {
        e.preventDefault();

        let chatMessage = this.state.chatMessage
        let userId = this.props.user.userData._id
        let userName = this.props.user.userData.name;
        let userImage = this.props.user.userData.image;
        let nowTime = moment();
        let type = "Text"

        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            userImage,
            nowTime,
            type
        });
        this.setState({ chatMessage: "" })
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <p style={{ fontSize: '2rem', textAlign: 'center' }}> Real Time Chat</p>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="infinite-container" style={{ height: '500px', overflowY: 'scroll' }}>
                        {this.props.chats && (
                            this.renderCards()
                        )}
                        <div
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                            style={{ float: "left", clear: "both" }}
                        />
                    </div>

                    <Row >
                        <Form layout="inline" onSubmit={this.submitChatMessage}>
                            <Col span={18}>
                                <Input
                                    id="message"
                                    prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Let's start talking"
                                    type="text"
                                    value={this.state.chatMessage}
                                    onChange={this.hanleSearchChange}
                                />
                            </Col>
                            <Col span={2}>
                                <Dropzone onDrop={this.onDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Button>
                                                    <Icon type="upload" />
                                                </Button>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </Col>

                            <Col span={4}>
                                <Button type="primary" style={{ width: '100%' }} onClick={this.submitChatMessage} htmlType="submit">
                                    <Icon type="enter" />
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        chats: state.chat
    }
}


export default connect(mapStateToProps)(ChatPage);
