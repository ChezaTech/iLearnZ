import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button, Card, Table, Badge, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { PencilIcon, TrashIcon, PlusIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

export default function Show({ auth, district, schools, allDistricts }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: district.name,
        region: district.region,
        province: district.province || '',
        address: district.address || '',
        phone: district.phone || '',
        email: district.email || '',
        district_education_officer: district.district_education_officer || '',
    });
    
    const handleEditSubmit = (e) => {
        e.preventDefault();
        put(route('districts.update', district.id), {
            onSuccess: () => {
                setShowEditModal(false);
                reset();
            }
        });
    };
    
    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        post(route('districts.destroy', district.id), {
            method: 'delete',
            onSuccess: () => {
                setShowDeleteModal(false);
            }
        });
    };
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        District Details: {district.name}
                    </h2>
                    <div className="flex space-x-4">
                        <Button 
                            variant="outline-primary"
                            onClick={() => setShowEditModal(true)}
                            className="flex items-center"
                        >
                            <PencilIcon className="h-4 w-4 mr-2" />
                            Edit District
                        </Button>
                        <Button 
                            variant="outline-danger"
                            onClick={() => setShowDeleteModal(true)}
                            className="flex items-center"
                        >
                            <TrashIcon className="h-4 w-4 mr-2" />
                            Delete District
                        </Button>
                    </div>
                </div>
            }
        >
            <Head title={`District: ${district.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <Card>
                                <Card.Header className="bg-gray-50 font-medium">District Information</Card.Header>
                                <Card.Body>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="font-medium">{district.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Code</p>
                                            <p className="font-medium">{district.code}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Region</p>
                                            <p className="font-medium">{district.region}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Province</p>
                                            <p className="font-medium">{district.province}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Address</p>
                                            <p className="font-medium">{district.address || 'Not specified'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="font-medium">{district.phone || 'Not specified'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{district.email || 'Not specified'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">District Education Officer</p>
                                            <p className="font-medium">{district.district_education_officer || 'Not specified'}</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            
                            <Card>
                                <Card.Header className="bg-gray-50 font-medium">District Statistics</Card.Header>
                                <Card.Body>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <p className="text-sm text-blue-500">Total Schools</p>
                                            <p className="font-bold text-2xl">{schools.length}</p>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <p className="text-sm text-green-500">Primary Schools</p>
                                            <p className="font-bold text-2xl">
                                                {schools.filter(school => school.type === 'primary').length}
                                            </p>
                                        </div>
                                        <div className="bg-purple-50 p-4 rounded-lg">
                                            <p className="text-sm text-purple-500">Secondary Schools</p>
                                            <p className="font-bold text-2xl">
                                                {schools.filter(school => school.type === 'secondary').length}
                                            </p>
                                        </div>
                                        <div className="bg-yellow-50 p-4 rounded-lg">
                                            <p className="text-sm text-yellow-600">Online Schools</p>
                                            <p className="font-bold text-2xl">
                                                {schools.filter(school => school.connectivity_status === 'online').length}
                                            </p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        
                        <Card>
                            <Card.Header className="bg-gray-50 font-medium flex justify-between items-center">
                                <span>Schools in {district.name}</span>
                                <Link href={route('schools.create')} className="btn btn-sm btn-primary flex items-center">
                                    <PlusIcon className="h-4 w-4 mr-1" />
                                    Add School
                                </Link>
                            </Card.Header>
                            <Card.Body>
                                {schools.length === 0 ? (
                                    <div className="text-center py-4">
                                        <BuildingOfficeIcon className="h-12 w-12 mx-auto text-gray-400" />
                                        <p className="mt-2 text-gray-500">No schools in this district yet</p>
                                        <Link href={route('schools.create')} className="btn btn-sm btn-primary mt-3">
                                            Add First School
                                        </Link>
                                    </div>
                                ) : (
                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Code</th>
                                                <th>Type</th>
                                                <th>Connectivity</th>
                                                <th>Students</th>
                                                <th>Teachers</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {schools.map(school => (
                                                <tr key={school.id}>
                                                    <td>
                                                        <Link href={route('schools.show', school.id)} className="font-medium text-blue-600 hover:text-blue-800">
                                                            {school.name}
                                                        </Link>
                                                    </td>
                                                    <td>{school.code}</td>
                                                    <td>
                                                        <Badge bg={school.type === 'primary' ? 'success' : 'info'}>
                                                            {school.type === 'primary' ? 'Primary' : 'Secondary'}
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        <Badge bg={school.connectivity_status === 'online' ? 'success' : 'warning'}>
                                                            {school.connectivity_status}
                                                        </Badge>
                                                    </td>
                                                    <td>{school.student_count}</td>
                                                    <td>{school.teacher_count}</td>
                                                    <td>
                                                        <div className="flex space-x-2">
                                                            <Link href={route('schools.show', school.id)} className="btn btn-sm btn-outline-primary">
                                                                View
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            
            {/* Edit District Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit District</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={data.name} 
                                onChange={e => setData('name', e.target.value)}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Region</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={data.region} 
                                onChange={e => setData('region', e.target.value)}
                                isInvalid={!!errors.region}
                            />
                            <Form.Control.Feedback type="invalid">{errors.region}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Province</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={data.province} 
                                onChange={e => setData('province', e.target.value)}
                                isInvalid={!!errors.province}
                            />
                            <Form.Control.Feedback type="invalid">{errors.province}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={data.address} 
                                onChange={e => setData('address', e.target.value)}
                                isInvalid={!!errors.address}
                            />
                            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={data.phone} 
                                onChange={e => setData('phone', e.target.value)}
                                isInvalid={!!errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={data.email} 
                                onChange={e => setData('email', e.target.value)}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>District Education Officer</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={data.district_education_officer} 
                                onChange={e => setData('district_education_officer', e.target.value)}
                                isInvalid={!!errors.district_education_officer}
                            />
                            <Form.Control.Feedback type="invalid">{errors.district_education_officer}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="me-2" onClick={() => setShowEditModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" disabled={processing}>
                                {processing ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" className="me-2" />
                                        Saving...
                                    </>
                                ) : 'Save Changes'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            
            {/* Delete District Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete District</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {schools.length > 0 ? (
                        <Alert variant="danger">
                            <Alert.Heading>Cannot Delete District</Alert.Heading>
                            <p>
                                This district has {schools.length} school(s) associated with it. 
                                You must reassign or delete these schools before deleting the district.
                            </p>
                        </Alert>
                    ) : (
                        <>
                            <p>Are you sure you want to delete the district <strong>{district.name}</strong>?</p>
                            <p className="text-danger">This action cannot be undone.</p>
                            
                            <div className="d-flex justify-content-end mt-4">
                                <Button variant="secondary" className="me-2" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={handleDeleteSubmit} disabled={processing}>
                                    {processing ? (
                                        <>
                                            <Spinner as="span" animation="border" size="sm" className="me-2" />
                                            Deleting...
                                        </>
                                    ) : 'Delete District'}
                                </Button>
                            </div>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </AuthenticatedLayout>
    );
}
