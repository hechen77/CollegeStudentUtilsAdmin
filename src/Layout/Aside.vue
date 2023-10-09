<template>
	<div class="LayoutAsidePageView">
		<div class="asideTitleView" @click="toIndex">
			<img src="@/assets/logo2.png" alt="">
			<p>{{ webTitle }}</p>
		</div>
		<div class="AsideNavListContentView">
			<el-menu
				class="el-menu-vertical-demo"
				background-color="#00000000"
				text-color="#bfcbd9"
				active-text-color="#409eff"
				:unique-opened="true"
				:router="true"
				default-active="/">
				<template v-if="navList.length != 0" v-for="item in navList">
					<el-submenu :key="item.id" :index="item.path" v-if="item.child.length > 0">
						<template slot="title">
							<span>{{ item.navTitle }}</span>
						</template>
						<el-menu-item-group>
							<el-menu-item v-for="childItem in item.child" :index="`${item.path+childItem.path}`"
							              :key="childItem.id">
								<span slot="title">{{ childItem.navTitle }}</span>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-menu-item v-else :index="item.path" :key="item.id">
						<span slot="title">{{ item.navTitle }}</span>
					</el-menu-item>
				</template>
			</el-menu>
		</div>
	</div>
</template>

<script>
import {webTitle} from "@/utils/config";
import {mapState} from "vuex";

export default {
	name: "Aside",
	data() {
		return {
			webTitle: webTitle,
			ShowPage: false
		}
	},
	methods: {
		toIndex() {
			this.$router.push("/")
		}
	},
	computed: {
		...mapState("userInfo", ["navList"])
	},
	mounted() {
	},
	beforeCreate() {
	},
}
</script>

<style scoped lang="less">

.LayoutAsidePageView {
	width: 100%;
	padding: 10px 0px;
	padding-top: 50px;
	height: 100%;
	position: relative;
	
	
	.asideTitleView {
		width: 100%;
		position: absolute;
		top: 0;
		padding: 10px 0;
		background-color: #304156 !important;
		z-index: 1;
		color: white;
		font-weight: 500;
		text-align: center;
		line-height: 40px;
		cursor: pointer;
		
		p {
			display: inline-block;
			margin: 0;
			color: #fff;
			font-weight: 500;
			line-height: 50px;
			font-size: 16px;
			vertical-align: middle;
			letter-spacing: .2em;
		}
		
		img {
			width: 26px;
			height: 26px;
			vertical-align: middle;
			margin-right: 12px;
		}
	}
	
	.AsideNavListContentView {
		width: 100% !important;
		height: 100%;
	}
}
</style>
<style lang="less">
.el-menu {
	border: none !important;
}

.el-menu-item {
	min-width: 10px !important;
	background-color: #00000000 !important;
	
	&:hover {
		color: #409eff;
	}
}

.el-submenu {
	background-color: #00000000 !important;
	transition: 100ms all !important;
	
	:hover {
		color: #409eff !important;
		background-color: #00000000 !important;
	}
}
</style>