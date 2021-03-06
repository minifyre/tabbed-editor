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
		flex-direction:row;
	}
		header button
		{
			border:0;
			border-radius:0;
			background:#fff;
			height:1rem;
			margin:0.25rem;
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
		background:#333;
		display:flex;
		position:relative;
		flex:1 1 auto;
		height:auto;
		width:100%;
	}
	header[data-fullscreen="true"]+main
    {
        height:100%;
        position:fixed;
        width:100%;
    }
	::slotted(*)
	{
		position:absolute;
		height:100%;
		width:100%;
	}`