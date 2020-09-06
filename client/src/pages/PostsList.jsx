import React, { Component } from 'react'
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import api from '../api'
import styled from 'styled-components'


const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
class UpdatePost extends Component {
    updatePost = event => {
        event.preventDefault()
        window.location.href = `/posts/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updatePost}>Update</Update>
    }
}

class DeleteMovie extends Component {
    deletePost = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the post ${this.props.id} permanently?`,
            )
        ) {
            api.deletePostById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deletePost}>Delete</Delete>
    }
}
class PostsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllPosts().then(posts => {
            this.setState({
                posts: posts.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { posts: posts, isLoading } = this.state
        console.log('TCL: MoviesList -> render -> posts', posts)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Text',
                accessor: 'text',
                filterable: true,
            },
            {
                Header: 'Likes',
                accessor: 'likes',
                filterable: true,
            },
            {
                Header: 'Time',
                accessor: 'time',
                Cell: props => <span>{props.value.join(' / ')}</span>,
            },
            {
                Header: '',
                accessor: '',
                Cell: function (props) {
                    return (
                        <span>
                            <DeleteMovie id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function (props) {
                    return (
                        <span>
                            <UpdatePost id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!posts.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={posts}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default PostsList