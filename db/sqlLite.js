const db_path = '_doc/bill.db'
export const db_name = 'main'

import { createBillTable } from './bill_table.js'
import { createBillTypeTable } from './bill_type_table.js'



export function initTable(){
	createBillTable()
	createBillTypeTable()
}

// 打开数据库
export function openDB(){
	return new Promise((reslove,reject) => {
		plus.sqlite.openDatabase({
			name: db_name,
			path: db_path,
			success: function(e){
				console.log('openDatabase success!');
				reslove(e)
			},
			fail: function(e){
				console.log('openDatabase failed: '+JSON.stringify(e));
				reject(e)
			}
		});
	})
}

// 关闭数据库
export function closeDB(){
	return new Promise((reslove,reject) => {
		plus.sqlite.closeDatabase({
			name: db_name,
			success: function(e){
				console.log('closeDatabase success!');
				reslove(e)
			},
			fail: function(e){
				console.log('closeDatabase failed: '+JSON.stringify(e));
				reject(e)
			}
		});
	})	
}

export function tableIsExit(tableName){
	let sql = `SELECT count(*) as count from sqlite_master where type='table' and name='${tableName}';`
	return new Promise((reslove,reject) => {
		plus.sqlite.executeSql({
			name: db_name,
			sql: sql,
			success: function(e){
				console.log('select table is exit success');
				reslove(e)
			},
			fail: function(e){
				console.log('select table is exit fail , '+JSON.stringify(e));
				reject(e)
			}
		});
	})	
	
	
}