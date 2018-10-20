import silo from './node_modules/pane-viewer/index.mjs'
const {config}=silo
config.state=
{
	file:
	{
		tabs:[]
	},
	view:
	{
		fullscreen:false,
		tab:null,
		type:'tabbed-editor'
	}
}
export default silo