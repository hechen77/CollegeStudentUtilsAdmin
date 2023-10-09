<template>
	<div class="layoutContentView">
		<el-container class="container">
			<el-aside class="aside">
				<Aside></Aside>
			</el-aside>
			<el-container class="mainContainer">
				<el-header class="header">
					<Header></Header>
				</el-header>
				<el-main class="main">
					<transition name="fade-transform" mode="out-in">
						<router-view name="main"></router-view>
					</transition>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import Aside from "@/Layout/Aside";
import Header from "@/Layout/Header";
import {localStorage} from "@/utils/config";


export default {
	name: "Layout",
	components: {
		Aside,
		Header
	},
	mounted() {
		this.$store.dispatch("userInfo/GET_NAVLIST", JSON.parse(localStorage.get("CSU")).identity)
	},
}
</script>

<style scoped lang="less">
/* fade */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
	transition: all .5s;
}

.fade-transform-enter {
	opacity: 0;
	transform: translateX(-30px);
}

.fade-transform-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
	transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
	opacity: 0;
	transform: translateX(20px);
}

.breadcrumb-move {
	transition: all .5s;
}

.breadcrumb-leave-active {
	position: absolute;
}

.layoutContentView {
	width: 100%;
	height: 100%;
	
	.container {
		width: 100%;
		height: 100%;
		
		.aside {
			width: 13% !important;
			min-height: 100%;
			background-color: #304156;
			box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
		}
		
		.mainContainer {
			width: 87%;
			height: 100%;
			
			.header {
				height: 50px !important;
				width: 100%;
				box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
			}
			
			.main {
				padding: 0 10px !important;
			}
		}
	}
}
</style>