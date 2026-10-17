// @vitest-environment jsdom
import React from 'react';
import { afterEach, expect, test } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

afterEach(cleanup);

test('rejects blank names and adds trimmed names with the selected priority', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.type(screen.getByLabelText('Tên công việc'), '   ');
  await user.click(screen.getByRole('button', { name: '+ Thêm' }));
  expect(screen.getByRole('alert').textContent).toContain('Vui lòng nhập');
  expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  await user.type(screen.getByLabelText('Tên công việc'), '  Học React  ');
  await user.selectOptions(screen.getByLabelText('Mức độ ưu tiên'), 'high');
  await user.click(screen.getByRole('button', { name: '+ Thêm' }));
  const task = screen.getByRole('listitem');
  expect(within(task).getByRole('heading').textContent).toBe('Học React');
  expect(within(task).getByText('Cao')).toBeTruthy();
  expect(screen.getByLabelText('Tên công việc').value).toBe('');
});

test('toggles both ways, updates counts, clears only completed tasks, and deletes', async () => {
  const user = userEvent.setup();
  render(<App />);
  for (const name of ['Việc A', 'Việc B']) {
    await user.type(screen.getByLabelText('Tên công việc'), name);
    await user.click(screen.getByRole('button', { name: '+ Thêm' }));
  }
  const counts = () => [...screen.getByRole('region', { name: 'Thống kê công việc' }).querySelectorAll('strong')].map((element) => element.textContent);
  expect(counts()).toEqual(['2', '0', '2']);
  const toggle = screen.getByRole('button', { name: 'Đổi trạng thái: Việc A' });
  await user.click(toggle);
  expect(counts()).toEqual(['2', '1', '1']);
  expect(screen.getAllByRole('listitem')[0].className).toContain('completed');
  await user.click(toggle);
  expect(counts()).toEqual(['2', '0', '2']);
  await user.click(toggle);
  await user.click(screen.getByRole('button', { name: 'Xóa các mục đã xong' }));
  expect(screen.queryByRole('heading', { name: 'Việc A' })).toBeNull();
  expect(screen.getByRole('heading', { name: 'Việc B' })).toBeTruthy();
  expect(counts()).toEqual(['1', '0', '1']);
  await user.click(screen.getByRole('button', { name: 'Xóa: Việc B' }));
  expect(counts()).toEqual(['0', '0', '0']);
  expect(screen.getByText('Chưa có công việc nào')).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Xóa các mục đã xong' }).disabled).toBe(true);
});
