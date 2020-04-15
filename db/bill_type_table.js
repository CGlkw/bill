import { db_name } from './sqlLite.js'

const create_bill_type_table = `
create table if not exists bill_type(
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"type_name" text,
"icon" text
)
`

const select_bill_type_sql = `
select * from bill_type
`

const init_data_sql = [
	'insert into bill_type ( type_name, icon) values("购物","icon-gouwu")',
	'insert into bill_type ( type_name, icon) values("充值","icon-shouji")',
	'insert into bill_type ( type_name, icon) values("餐饮","icon-canting")',
	'insert into bill_type ( type_name, icon) values("旅行","icon-jingdian")',
	'insert into bill_type ( type_name, icon) values("交通","icon-gongjiaoche")'
]

export function createBillTypeTable(){
	return new Promise((reslove,reject) => {
		// #ifdef APP-PLUS 
		plus.sqlite.executeSql({
			name: db_name,
			sql: create_bill_type_table,
			success: function(e){
				console.log("创建bill_type表成功")
				plus.sqlite.executeSql({
					name: db_name,
					sql: init_data_sql,
					success: function(e){
						console.log("bill_type表初始化成功")					
						reslove(e)
						
					},
					fail: function(e){
						reject(e)
					}
				});				
			},
			fail: function(e){
				reject(e)
			}
		});
		// #endif
	})	
}

export function selectAllBillTypeTable(data){

	console.log("查询bill_type sql:" + select_bill_type_sql)
	
	return new Promise((reslove,reject) => {
		// #ifdef APP-PLUS 
		plus.sqlite.selectSql({
			name: db_name,
			sql: select_bill_type_sql,
			success: function(e){
				reslove(e)
			},
			fail: function(e){
				reject(e)
			}
		});
		// #endif
	})
	
}

export function insertBillTypeTable(data){
	
	let insert_sql = `insert into bill_type ( type_name, icon) values('${data.typeName}','${data.icon}')`
	
	console.log("插入bill_type sql:" + insert_sql)
	
	
	return new Promise((reslove,reject) => {
		// #ifdef APP-PLUS 
		plus.sqlite.executeSql({
			name: db_name,
			sql: insert_sql,
			success: function(e){
				uni.showToast({
					title: 'bill_type表插入成功:' + e.toString(),
					duration: 2000
				});
				reslove(e)
			},
			fail: function(e){
				uni.showToast({
					title: 'bill_type表插入失败:' + e.toString(),
					duration: 2000
				});
				reject(e)
			}
		});
		// #endif
	})	

}