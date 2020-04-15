const db_path = '_doc/bill.db'
export const db_name = 'billdev'

import { createBillTable } from './bill_table.js'

export function initTable(){
	createBillTable()
	
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