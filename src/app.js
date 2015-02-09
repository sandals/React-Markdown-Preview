var App = React.createClass({
	getInitialState: function() {
		return {
			preview_body: '# '
		};
	},
	updatePreview: function(textarea_body) {
		this.setState({
			preview_body: textarea_body
		});
	},
	render: function() {
		return (
			<div>
				<Editor onKeyUp={this.updatePreview}/>
				<Preview body={this.state.preview_body}/>
			</div>
		);
	}
});

var Editor = React.createClass({
	getInitialState: function() {
		return { body: "# " }
	},
	handleKeyUp: function() {
		var ref_val = this.refs.theEditor.getDOMNode().value;
		this.props.onKeyUp(ref_val);
	},
	render: function() {
		return (
			<div className="editor-container">
				<textarea ref="theEditor" onKeyUp={this.handleKeyUp} className="responsive-editor" defaultValue={this.state.body} />
			</div>
		);
	}
});

var Preview = React.createClass({
	render: function() {
		var converter = new Showdown.converter();
		var markdown = converter.makeHtml(this.props.body);
		
		return (
			<div className="editor-preview">
				<div className="preview-content" dangerouslySetInnerHTML={{__html: markdown}}/>
			</div>
		);
	}
});

React.render(<App/>, document.body);
