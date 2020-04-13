import db_name from './sqlLite.js'

const create_bill_table = `
create table if not exists bill(
id int primary key not null,
type text,
remark text,
time text,
money text
)
`

const select_bill_table = `
select * from bill
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
	const type = data.type
	const remark= data.remark
	const time= data.time
	const money= data.money
	
	let insert_sql = `insert into bill values('${data.type}','${data.remark}','${data.time}','${data.money}')`
	// #ifdef APP-PLUS 
	return new Promise((reslove,reject) => {
		plus.sqlite.executeSql({
			name: db_name,
			sql: insert_sql,
			success: function(e){
				reslove(e)
			},
			fail: function(e){
				reject(e)
			}
		});
	})	
	// #endif
}

export function selectAllBillTable(){
	// #ifdef APP-PLUS 
	return new Promise((reslove,reject) => {
		plus.sqlite.selectSql({
			name: db_name,
			sql: select_bill_table,
			success: function(e){
				reslove(e)
			},
			fail: function(e){
				reject(e)
			}
		});
	})
	// #endif
}