<template>
	<div class="LayoutHeaderPageView">
		<div class="LayoutHeaderConfigView">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item
					
					v-for="item in breadcrumbList"
					:key="item.title"
					style="cursor:pointer;"
				>{{ item.title }}
				</el-breadcrumb-item
				>
			</el-breadcrumb>
		</div>
		<div class="LayoutHeaderAvatarView">
			<div class="userInfoContentView">
				<el-dropdown trigger="click">
      <span class="el-dropdown-link" style="cursor:pointer;">
        {{ userInfo.userName }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>个人中心</el-dropdown-item>
						<el-dropdown-item>修改密码</el-dropdown-item>
						<el-dropdown-item divided>
							<div @click="logout">退出登录</div>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from "vuex";
import {MessageBox} from "element-ui";
import {localStorage} from "@/utils/config";

export default {
	name: "Header",
	data() {
		return {
			breadcrumbList: []
		}
	},
	computed: {
		...mapState("userInfo", ["userInfo"])
	},
	mounted() {
	},
	methods: {
		logout() {
			MessageBox.confirm("确认要退出登录？", "提示信息", {
				type: "warning",
				confirmButtonText: "确定",
				cancelButtonText: "取消"
			}).then(res => {
				localStorage.remove("CollegeStudentUtilsLoginToken")
				this.$router.push({name: "userLogin"})
			}).catch(err => {
			})
		},
		caleBreadcrumb() {
			const temp = [];
			this.$route.matched.forEach(item => {
				if (item.meta.title && item.path) {
					temp.push({path: item.path, title: item.meta.title})
				}
			})
			this.breadcrumbList = temp;
		}
	},
	created() {
		this.caleBreadcrumb()
	},
	watch: {
		// 写法 一 :
		// '$route.path'() {
		//   this.caleBreadcrumb() //路由变化后重新进行计算
		// }
		
		// 写法二 :
		'$route.path': {
			handler() {
				this.caleBreadcrumb()
			},
			immediate: true
		}
	}
}
</script>

<style scoped lang="less">
.LayoutHeaderPageView {
	width: 100%;
	height: 100%;
	line-height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	
	.LayoutHeaderConfigView {
		width: 50%;
		height: 100%;
		color: #97a8be;
		display: flex;
		justify-content: left;
		align-items: center;
	}
	
	.LayoutHeaderAvatarView {
		width: 50%;
		height: 100%;
		display: flex;
		justify-content: right;
		align-items: center;
	}
}
</style>