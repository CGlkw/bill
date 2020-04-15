import { db_name } from './sqlLite.js'

const create_bill_table = `
CREATE TABLE if not exists "bill" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "type" TEXT,
  "remark" TEXT,
  "time" TEXT,
  "money" TEXT
)
`

const select_bill_table = `
select b.id, b.remark, b.time, b.money, bt.type_name as type, bt.icon from bill as b LEFT OUTER JOIN bill_type as bt on b.type = bt.id
`

export function createBillTable(){
	return new Promise((reslove,reject) => {
		plus.sqlite.executeSql({
			name: db_name,
			sql: create_bill_table,
			success: function(e){
				reslove(e)
			},
			fail: function(e){
				reject(e)
			}
		});
	})	
}

export function insertBillTable(data){
	
	let insert_sql = `insert into bill ( type, remark, time ,money) values('${data.type}','${data.remark}','${data.time}','${data.money}')`
	
	console.log("插入bill sql:" + insert_sql)
	
	// #ifdef APP-PLUS 
	return new Promise((reslove,reject) => {
		plus.sqlite.executeSql({
			name: db_name,
			sql: insert_sql,
			success: function(e){
				uni.showToast({
					title: 'bill表插入成功:' + e.toString(),
					duration: 2000
				});
				reslove(e)
			},
			fail: function(e){
				uni.showToast({
					title: 'bill表插入失败:' + e.toString(),
					duration: 2000
				});
				reject(e)
			}
		});
	})	
	// #endif
}

export function selectAllBillTable(data){
	
	let sql;
	if (!data){
		sql = select_bill_table
	}else {
		let selectSql = ''
		if(data.startDate){
			selectSql = selectSql + ' and b.time >= ' + data.startDate
		}
		if(data.endDate){
			selectSql = selectSql + ' and b.time < ' + data.endDate
		}
		if(data.type){
			selectSql = selectSql + ' and b.type = ' + data.type
		}
		if(data.size){
			selectSql = selectSql + ' limit ' + data.size
		}
		if(data.start){
			selectSql = selectSql + ' offset ' + data.start
		}
		
		if( selectSql.startsWith(' and') ){
			selectSql = selectSql.substring(4, selectSql.length)
			selectSql = ' where ' + selectSql
			
		}
		if(selectSql){
			sql = select_bill_table + selectSql
		}else{
			sql = select_bill_table
		}
	}
	
	console.log("查询bill sql:" + sql)
	
	
	return new Promise((reslove,reject) => {
		// #ifdef APP-PLUS 
		plus.sqlite.selectSql({
			name: db_name,
			sql: sql,
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