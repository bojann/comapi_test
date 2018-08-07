import React,{Component} from 'react';
import RepoItemList from './RepoItemList';
import GithubService from '../services/GithubService';

class RepoView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gitRepositories: [],
            repoUrl: 'https://api.github.com/orgs/comapi/repos'
        }

        this.loadContent = this.loadContent.bind(this);
    }

    loadContent() {
        GithubService.getData(this.state.repoUrl)
        .then((resp) => {
            this.setState((prevState,props) => {
                return{
                    gitRepositories: resp
                }
            });
        })
        .catch( (err) => {
            console.log(`Parsing faild, ${err}`);
        });
    }

    componentDidMount(prevProps, prevState) {
        this.loadContent();
    }

    render() {
        return(
            <div>
                <RepoItemList gitRepositories={this.state.gitRepositories} onClickHandlePathname={this.props.onClickHandlePathname}></RepoItemList>
            </div>
        )
    }
   
}

export default RepoView;
