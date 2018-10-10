import silo from './node_modules/pane-viewer/index.mjs'
const {config}=silo
config.state=
{
	fullscreen:false,
	tab:null,
	tabs:[],
	type:'tabbed-editor'
}
export default silo