export const mockDefaultRoutes = () => {
	cy.intercept(
		'GET',
		'**/status*',
		{
			fixture: "status_done.json"
		}
	).as('getStatus')

	cy.intercept(
		'GET',
		'**/get_task_result/*',
		{
			fixture: "default_task.json"
		}
	).as('getDefaultTask')

	cy.intercept(
		'GET',
		'**/get_task_result/443bca46-bd8c-45fc-9f88-655b10c24f8d',
		{
			fixture: "task_1.json"
		}
	).as('getTask1')

	cy.intercept(
		'GET',
		'**/get_task_result/41ffe80b-1328-4d68-8036-347a28700db4',
		{
			fixture: "task_2.json"
		}
	).as('getTask2')

	cy.intercept(
		'GET',
		'**/get_task_result/e0e5c673-2ba5-480d-a772-0de9c9dbf17c',
		{
			fixture: "task_3.json"
		}
	).as('getTask3')

	cy.intercept(
		'GET',
		'**/get_task_result/fb529b89-5594-4ad6-9830-0ad962b02a04',
		{
			fixture: "task_4.json"
		}
	).as('getTask4')

	cy.intercept(
		'GET',
		'**/get_task_result/be1fe2a8-fa64-4d13-b392-a908be1a83a2',
		{
			fixture: "task_result.json"
		}
	).as('getTaskResult')

	cy.intercept(
		'POST',
		'**/add_task*',
		{
			fixture: "add_task.json"
		}
	).as('getAddTask')

	cy.intercept(
		'GET',
		'**/get_task_status/5c1ac2b8-a066-464f-90d8-507c15e9b5c6',
		{
			fixture: "task_progress.json"
		}
	).as('getStatusTask')


	// (xhr)POST 200 http://localhost:5000/add_task
	// 	(xhr)GET 200 http://localhost:5000/get_task_status/08f7393c-c2dd-43cb-a4d3-65b3bd086d4d


}