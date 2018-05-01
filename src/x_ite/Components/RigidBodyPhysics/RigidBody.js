/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Core/X3DNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNode, 
          X3DConstants,
          X3DCast,
          Vector3)
{
"use strict";

	function RigidBody (executionContext)
	{
		X3DNode .call (this, executionContext);

		this .addType (X3DConstants .RigidBody);

		this .addChildObjects ("collection", new Fields .SFNode (),
		                       "transform",  new Fields .SFTime ());

		this .compoundShape = new Ammo .btCompoundShape ();
		this .motionState   = new Ammo .btDefaultMotionState ();
		this .rigidBody     = new Ammo .btRigidBody (new Ammo .btRigidBodyConstructionInfo (0, this .motionState, this .compoundShape));
		this .geometryNodes = [ ];
		this .force         = new Vector3 (0, 0, 0);
		this .torque        = new Vector3 (0, 0, 0);
	}

	RigidBody .prototype = Object .assign (Object .create (X3DNode .prototype),
	{
		constructor: RigidBody,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",              new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "fixed",                new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "position",             new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "orientation",          new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "linearVelocity",       new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "angularVelocity",      new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "useFiniteRotation",    new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "finiteRotationAxis",   new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "autoDamp",             new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "linearDampingFactor",  new Fields .SFFloat (0.001)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "angularDampingFactor", new Fields .SFFloat (0.001)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "mass",                 new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "centerOfMass",         new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "massDensityModel",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "useGlobalGravity",     new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "forces",               new Fields .MFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "torques",              new Fields .MFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "inertia",              new Fields .SFMatrix3f (1, 0, 0, 0, 1, 0, 0, 0, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "autoDisable",          new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "disableTime",          new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "disableLinearSpeed",   new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "disableAngularSpeed",  new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "geometry",             new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "RigidBody";
		},
		getComponentName: function ()
		{
			return "RigidBodyPhysics";
		},
		getContainerField: function ()
		{
			return "bodies";
		},
		initialize: function ()
		{
			X3DNode .prototype .initialize .call (this);

			this .linearVelocity_       .addInterest ("set_linearVelocity__",     this);
			this .angularVelocity_      .addInterest ("set_angularVelocity__",    this);
			this .useFiniteRotation_    .addInterest ("set_finiteRotationAxis__", this);
			this .finiteRotationAxis_   .addInterest ("set_finiteRotationAxis__", this);
			this .autoDamp_             .addInterest ("set_damping__",            this);
			this .linearDampingFactor_  .addInterest ("set_damping__",            this);
			this .angularDampingFactor_ .addInterest ("set_damping__",            this);
			this .forces_               .addInterest ("set_forces__",             this);
			this .torques_              .addInterest ("set_torques__",            this);
			this .disableTime_          .addInterest ("set_disable__",            this);
			this .disableTime_          .addInterest ("set_disable__",            this);
			this .disableLinearSpeed_   .addInterest ("set_disable__",            this);
			this .disableAngularSpeed_  .addInterest ("set_disable__",            this);
			this .geometry_             .addInterest ("set_geometry__",           this);

			this .fixed_   .addInterest ("set_massProps__", this);
			this .mass_    .addInterest ("set_massProps__", this);
			this .inertia_ .addInterest ("set_massProps__", this);

			this .transform_ .addInterest ("set_transform__", this);

			this .set_geometry__ ();
			this .set_forces__ ();
			this .set_torques__ ();
		},
		setCollection: function (value)
		{
			this .collection_ = value;
		},
		getCollection: function ()
		{
			return this .collection_ .getValue ();
		},
		getRigidBody: function ()
		{
			return this .rigidBody;
		},
		set_linearVelocity__: function ()
		{
		},
		set_angularVelocity__: function ()
		{
		},
		set_transform__: function ()
		{
		},
		set_finiteRotationAxis__: function ()
		{
		},
		set_massProps__: function ()
		{
		},
		set_damping__: function ()
		{
		},
		set_forces__: function ()
		{
		},
		set_torques__: function ()
		{
		},
		set_disable__: function ()
		{
		},
		set_geometry__: function ()
		{
			for (var i = 0, length = this .geometryNodes .length; i < length; ++ i)
			{
				var geometryNode = this .geometryNodes [i];

				geometryNode .removeInterest ("addEvent", this .transform_);
				geometryNode .body_ .removeInterest ("set_geometry__", this);
		
				geometryNode .setBody (null);
		
				geometryNode .translation_ .removeFieldInterest (this .position_);
				geometryNode .rotation_    .removeFieldInterest (this .orientation_);
		
				this .position_    .removeFieldInterest (geometryNode .translation_);
				this .orientation_ .removeFieldInterest (geometryNode .rotation_);
			}

			this .geometryNodes .length = 0;

			for (var i = 0, length = this .geometry_ .length; i < length; ++ i)
			{
				var geometryNode = X3DCast (X3DConstants .X3DNBodyCollidableNode, this .geometry_ [i]);
				
				if (! geometryNode)
					continue;
		
				if (geometryNode .getBody ())
				{
					geometryNode .body_ .addInterest ("set_geometry__", this);
					continue;
				}
		
				geometryNode .setBody (this);
		
				this .geometryNodes .push (geometryNode);
			}
		
			for (var i = 0, length = this .geometryNodes .length; i < length; ++ i)
			{
				var geometryNode = this .geometryNodes [i];

				geometryNode .addInterest ("addEvent", this .transform_);

				geometryNode .translation_ .addFieldInterest (this .position_);
				geometryNode .rotation_    .addFieldInterest (this .orientation_);

				this .position_    .addFieldInterest (geometryNode .translation_);
				this .orientation_ .addFieldInterest (geometryNode .rotation_);
			}

			this .set_compoundShape__ ();
		},
		set_compoundShape__: function ()
		{
		},
		applyForces: function (gravity)
		{
		},
		update: function ()
		{
		},
	});

	return RigidBody;
});


