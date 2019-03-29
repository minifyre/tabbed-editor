config.apps={}
config.state=
{
	file:
	{
		tabs:[]
	},
	view:
	{
		app:null,
		fullscreen:false,
		showAppDrawer:true,
		tab:null,
		type:'tabbed-editor'
	}
}
config.style=`
:host
{
	contain:content;
	display:flex;
	flex-direction:column;
	height:100%;
	position:relative;
	width:100%;
}
	header
	{
		background:#ccc;
		display:flex;
		height:1.5rem;
		flex-direction:row;
		padding-left:0.25rem;
		padding-top:0.25rem;
	}
		header button
		{
			border:0;
			border-radius:0;
			background:#fff;
			height:1rem;
			margin:0.25rem;
			padding:0.1rem;
			user-select:none;
			width:1rem;
		}
		header[data-fullscreen="true"] [data-pointerdown="toggleFullscreen"]
		{
			position:fixed;
			opacity:0.5;
			z-index:2;
		}
		header button:hover
		{
			cursor:pointer;
		}
		header button:focus
		{
			outline:none;
		}
		header .tabs
		{
			display:flex;
			flex:1 1 auto;
			flex-direction:row;
			margin-left:0.25rem;
		}
			header .tabs .selected
			{
				background:#fff;
			}
			header .tab
			{
				align-items:center;
				display:flex;
				flex-direction:row;
				justify-content:center;
				padding:0 0.25rem;
				user-select:none;
			}
				header .tab .icon
				{
					background:#999;
					color:transparent;
				}
				header .tab:hover
				{
					background:rgba(255,255,255,0.8);
					cursor:pointer;
				}
				header .tab .icon:hover
				{
					background:#c00;
					color:#fff;
				}
	main
	{
		display:flex;
		height:calc(100% - 1.5rem);/*@todo fix this!*/
		position:relative;
		flex:1 1 auto;/*@todo not working!*/
		width:100%;
	}
	header[data-fullscreen="true"]+main
    {
        height:100%;
        position:fixed;
        width:100%;
    }
	::slotted(*),.app-drawer
	{
		position:absolute;
		height:100%;
		width:100%;
	}
	.app-drawer
	{
		padding:0.5rem;
	}
		.app
		{
			background-size:100% auto;
			background-position:center;
			background-repeat:no-repeat;
			float:left;
			display:flex;
			height:4rem;
			margin:0.5rem;
			margin-bottom:1.5rem;
			position:relative;
			text-align:center;
			width:4rem;
		}
		.app::after
		{
			content:attr(data-app);
			bottom:-1.25rem;
			font-size:0.8rem;
			left:-0.25rem;
			position:absolute;
			text-align:center;
			width:calc(100% + 0.5rem);
		}
		.app:hover
		{
			cursor:pointer;
		}
`