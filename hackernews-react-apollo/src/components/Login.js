import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Link from "./LinkList";

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            login: false
        }
    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({[e.target.name] : e.target.value})
    }
    login = (e) => {
        localStorage.setItem("token", )
        this.setState({login: true})
    }

    render()
    {
        const FEED_MUTATION = gql`{
           mutation login(email: ${this.state.email}, password: ${this.state.password}) {
                token
            }
        }`
        if (this.state.login === false ) {
            return (
                <div>
                    <input
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="email"
                    />
                    <input
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="password"
                    />
                    <button onClick={this.login}>Login</button>
                </div>
            );
        } else {
            return (
                <Mutation mutation={FEED_MUTATION}>
                    {({ loading, error, data }) => {
                        if (loading) return <div>Fetching</div>
                        if (error) return <div>Error</div>

                        const linksToRender = data.feed.links

                        return (
                            <div>
                                {linksToRender.map(link => <Link key={link.id} link={link} />)}
                            </div>
                        )
                    }}
                </Mutation>
            )
        }

    }
}

export default Login