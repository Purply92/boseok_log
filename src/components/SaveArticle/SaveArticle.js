import React, { PureComponent } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { saveArticles, getArticleById } from '../../actions';
import { NAMES } from '../../constants';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
}
const style = {
  width: '100%'
}
class SaveArticle extends PureComponent {
  constructor(props) {
    super(props);

    const articleId = this.props.match.params.id ? this.props.match.params.id : null;
    this.state = {
      selectedCategory: 'js',
      titleInput: '',
      contentInput: '',
      articleId
    };
  }

  componentDidMount() {
    if (this.state.articleId) {
      getArticleById(this.state.articleId)
        .then((res) => {
          this.setState({
            selectedCategory: res.category,
            titleInput: res.title,
            contentInput: res.content
          });
        })
    }
  }

  handleChange = (event, index, selectedCategory) => this.setState({ selectedCategory });
  handleTitleInput = e => this.setState({ titleInput: e.target.value });
  handleContentInput = e => this.setState({ contentInput: e.target.value });
  postArticle = () => {
    const title = this.state.titleInput.replace(/'/gi, "\\'");
    const content = this.state.contentInput.replace(/'/gi, "\\'");
    const body = {
      category: this.state.selectedCategory,
      title,
      content
    };
    saveArticles(body, this.state.articleId)
      .then(({ status, msg }) => alert(msg, status));
  }

  render() {
    return (
      <div style={containerStyle}>
        <SelectField
          floatingLabelText="Category"
          value={this.state.selectedCategory}
          onChange={this.handleChange}
        >
          {Object.keys(NAMES).map((key, index) => {
            return (
              <MenuItem value={key} primaryText={NAMES[key]} key={index} />
            );
          })}
        </SelectField>
        <br />
        <TextField
          hintText="Title"
          onChange={this.handleTitleInput}
          value={this.state.titleInput}
          style={style}
        />
        <br />
        <TextField
          hintText="Content"
          multiLine={true}
          rows={4}
          onChange={this.handleContentInput}
          value={this.state.contentInput}
          style={style}
        />
        <br />
        <RaisedButton label="post" primary={true} onClick={this.postArticle} />
      </div>
    )
  }
}

export default SaveArticle;